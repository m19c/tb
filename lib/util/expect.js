module.exports = {
    isGreaterThan: function isGreaterThan(value, than) {
        'use strict';

        return value > than;
    },
    isGreaterOrEqualThan: function isGreaterOrEqualThan (value, than) {
        'use strict';

        return value >= than;
    },
    isLowerThan: function isLowerThan(value, than) {
        'use strict';

        return value < than;
    },
    isLowerOrEqualThan: function isLowerOrEqualThan(value, than) {
        'use strict';

        return value <= than;
    },
    isStrictEqual: function isStrictEqual(value, expected) {
        'use strict';

        return value === expected;
    },
    isRegExpTruly: function isRegExpTruly(value, regExp) {
        'use strict';

        return regExp.test(value) === true;
    },
    isRegExpFalsely: function isRegExpFalsely(value, regExp) {
        'use strict';

        return regExp.test(value) === false;
    }
};