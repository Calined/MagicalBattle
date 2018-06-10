"use strict";

class Util {

    //wraps a value around min and max (not for arrays!)
    static wrap(value, min, max) {

        if (value > max) {
            value = min + (value - max);
        }

        if (value < min) {
            value = max - (min - value);
        }

        return value;

    }

    //wraps a value around min and max (for arrays!)
    static wrapArray(value, min, max) {

        if (value > max) {
            value = min;
        }

        if (value < min) {
            value = max;
        }

        return value;

    }

    static lerp(value1, value2, amount) {

        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;

        return value1 + (value2 - value1) * amount;
    }

}