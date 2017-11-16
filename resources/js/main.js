class Form {
    constructor() {
        this.filterParams = {};
        this.imageElem = document.getElementById('image');
        this.operationTypeElem = document.getElementById('operation');
        this.cutoffElem = document.getElementById('cutoff');
        this.windowSizeElem = document.getElementById('windowSize');
        this.statisticalFilterElem = document.getElementById('statistical-filter');
        this.smoothingFilterElem = document.getElementById('smoothing-filter');
        this.orderElem = document.getElementById('order');
        this.setDefaultValues();
        this.setEventListeners();
    }

    setDefaultValues() {
        let image = document.getElementById('image').value;
        let operationType = document.getElementById('operation').value;
        let cutoff = document.getElementById('cutoff').value || 0;
        let windowSize = document.getElementById('windowSize').value || 0;
        let statisticalFilter = document.getElementById('statistical-filter').value || 0;
        let smoothingFilter = document.getElementById('smoothing-filter').value || 0;
        let order = document.getElementById('order').value || 2;
        this.filterParams = {
            image,
            operationType,
            cutoff,
            windowSize,
            statisticalFilter,
            smoothingFilter,
            order
        };
        $('.source-image').attr('src', '/controllers/assets/images/' + image);
        this.updateFields();
    }
    setEventListeners() {
        document.getElementById('operation').addEventListener('input', event => this.updateOperationType(event));
        document.getElementById('image').addEventListener('input', event => this.updateImage(event));
        document.getElementById('cutoff').addEventListener('input', event => this.validateCutoff(event));
        document.getElementById('order').addEventListener('input', event => this.validateOrder(event));
        document.getElementById('windowSize').addEventListener('input', event => this.validateWindowSize(event));
        document.getElementById('statistical-filter').addEventListener('input', event => this.validateFilter(event));
        document.getElementById('smoothing-filter').addEventListener('input', event => this.validateFilter(event));
        document.getElementById('submit').addEventListener('click', () => this.handleSubmit(event));
    }

    updateOperationType(event) {
        this.filterParams.operationType = event.target.value;
    }

    updateImage(event) {
        this.filterParams.image = event.target.value;
    }
    updateFields () {
        this.imageElem.value = this.filterParams.image;
        this.operationTypeElem.value = this.filterParams.operationType;
        this.cutoffElem.value = this.filterParams.cutoff;
        this.windowSizeElem.value = this.filterParams.windowSize;
        this.statisticalFilterElem.value = this.filterParams.statisticalFilter;
        this.smoothingFilterElem.value = this.filterParams.smoothingFilter;
        this.orderElem.value = this.filterParams.order;
    }

    static sanitize(input) {
        console.log(input);
        return input.replace(/\D+/gi, '');
    }

    validateCutoff(event) {
        this.filterParams.cutoff = Form.sanitize(event.target.value);
        this.updateFields();
    }

    validateOrder(event) {
        this.filterParams.order = Form.sanitize(event.target.value);
        this.updateFields();
    }

    validateWindowSize(event) {
        this.filterParams.windowSize = Form.sanitize(event.target.value);
        this.updateFields();
    }

    validateFilter(event) {
        this.filterParams.filter = Form.sanitize(event.target.value);
        this.updateFields();
    }

    handleSubmit() {
        $.ajax({
            url: `http://localhost:8080/${this.filterParams.operationType}`,
            data: this.filterParams,
            success: function(data) {
                console.log(data);
                $('.image-out').attr('src', data);
            },
            fail: function(error) {
                console.log(error);
            }
        });
    }

    /**
     * Hongwei
     * Operation: Statistical Order Filter
     * Params: {
     *      Filter: [median, mean, adaptive]
     *      Window Size: [3x3, 5x5, and 7x7]
     * }
     */

    /**
     * Tyler Do
     * For my parameters I just the image, window size, and which mean filter (the 1/9 or (1/16 we discussed on the slides)
     * Operation: Smoothing
     * Params: {
     *      Mean Filter: [1/9, 1/16]
     *      Window Size: [3x3, 5x5, and 7x7]
     * }
     */
}

new Form();