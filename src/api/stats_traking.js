/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */


export default class stats {

    constructor() {
        this.db = '../../database';

        this.ip_tracking = require(`${db}/ip_tracking.json`);
        this.daily = require(`${db}/daily.json`);

    }

    get(stats, arg1, arg2) {

        if (stats === 'ipTracking') {

            const day = arg1;
            const ip = arg2;

            return this.ip_tracking.day.ip

        } else if (stats === 'daily') {

            const day = arg1;
            const access = arg2;

            return this.daily.day.access

        }

    }

}