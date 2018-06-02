function Util() {

    //wraps a value around min and max
    function wrap(value, min, max) {

        if (value > max) { value = min + (value - max); }

        if (value < min) { value = max - (min - value); }

        return value;

    }
}

