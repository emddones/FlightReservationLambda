
module.exports = {
    logger: function (name) {
        console.log('[INFO][SYSTEM] Preparing logger for ' + name);
        if (!name) {
            name = "[GENERIC]";
        } else {
            name = "[" + name + "]"
        }

        return {
            name: name,

            levelValue: '[INFO]',

            level: function (level) {
                this.levelValue = '[' + level + ']';
                return this;
            },

            log: function (message) {
                var logMessage = this.levelValue + this.name + ' ' + message;
                console.log(logMessage);
            }
        }
    }
}