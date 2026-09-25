import {
    defineConfig,
    devices
} from '@playwright/test';

import { ENV } from './config/env';

export default defineConfig({

    testDir: './tests',

    //fullyParallel: true,
    // workers: 2,
    // retries:  2,

    reporter: [
        ['html',{
            outputFolder: 'playwright-report',
            open: 'always'
        }],
        ['list']
    ],

    use: {

        baseURL: ENV.baseUrl,

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        headless: true,

        viewport: {
            width: 1280,
            height: 720
        }
    },

    projects: [

        // ==========================================
        // AUTHENTICATION SETUP
        // ==========================================

        {
            name: 'setup',

            testDir: './setup',

            testMatch: /.*\.setup\.ts/
        },


        // ==========================================
        // LOGIN TESTS
        // ==========================================

        {
            name: 'login',

            testMatch: /login\/.*\.spec\.ts/,

            use: {
                ...devices['Desktop Chrome']
            }
        },


        // ==========================================
        // EMPLOYEE TESTS
        // ==========================================

        {
            name: 'employee',

            testMatch: /employee\/.*\.spec\.ts/,

            use: {
                ...devices['Desktop Chrome'],

                storageState:
                    'playwright/.auth/user.json'
            },

            dependencies: ['setup']
        }
    ]
});