function Util() {

    //wraps a value around min and max
    this.wrap = function (value, min, max) {

        if (value > max) { value = min + (value - max); }

        if (value < min) { value = max - (min - value); }

        return value;

    }
}

