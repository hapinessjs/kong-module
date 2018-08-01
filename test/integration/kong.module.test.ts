/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness, HapinessModule } from '@hapiness/core';

// element to test
import { KongModule } from '../../src';

@suite('- Integration KongModule file')
export class KongModuleTest {
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
}
