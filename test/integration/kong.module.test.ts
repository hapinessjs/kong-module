/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness, HapinessModule, HttpServerExt, Server, Lib, OnStart, Inject } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

// element to test
import { KongModule } from '../../src';

@suite('- Integration KongModule file')
class KongModuleTest {
    /**
     * Function executed before the suite
     */
    static before() {}

    /**
     * Function executed after the suite
     */
    static after() {}

    /**
     * Class constructor
     * New lifecycle
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {}

    /**
     * Function executed after each test
     */
    after() {}

    /**
     * Should throw if neither adminUrl or adminSecureUrl is set
     */
    @test('- Should throw if neither adminUrl or adminSecureUrl is set')
    startUpFailWhenNoAdminUrlFound(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                KongModule.setConfig({
                    proxySecureUrl: 'https://proxy-kong.com'
                })
            ]
        })
        class ApplicationModule { }

        Hapiness.bootstrap(ApplicationModule)
        .then(() => done(new Error('Should not succeed')))
        .catch(err => {
            unit.string(err).isEqualTo('Kong module requires an adminUrl or an adminSecureUrl');
            done();
        });
    }

    /**
     * Should throw if neither proxyUrl or proxySecureUrl is set
     */
    @test('- Should throw if neither proxyUrl or proxySecureUrl is set')
    startUpFailWhenNoProxyUrlFound(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                KongModule.setConfig({
                    adminSecureUrl: 'https://admin-kong.com'
                })
            ]
        })
        class ApplicationModule { }

        Hapiness.bootstrap(ApplicationModule)
        .then(() => done(new Error('Should not succeed')))
        .catch(err => {
            unit.string(err).isEqualTo('Kong module requires a proxyUrl or a proxySecureUrl');
            done();
        });
    }

    testSayHelloGetRoute(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                KongModule
            ]
        })
        class HWMTest implements OnStart {
            constructor(@Inject(HttpServerExt) private _httpServer: Server) {}

            onStart(): void {
                this._httpServer.inject('/sayHello', reply => unit.string(reply.result).is('Hello World')
                        .when(_ => Hapiness['extensions'].pop().value.stop().then(__ => done())));
            }
        }

        Hapiness.bootstrap(HWMTest, [
            HttpServerExt.setConfig({ host: '0.0.0.0', port: 4443 })
        ]);
    }
}
