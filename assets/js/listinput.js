;(function ($) {
    function ListInput(element, options) {
        var base = this;
        var val;

        this.element = $(element);
        this.options = $.extend({}, ListInput.Defaults, options);

        this.element.hide();

        this.wrap = $('<ul class="listinput-wrap list-unstyled">');
        this.wrap.insertAfter(this.element);

        try {
            val = JSON.parse(this.element.val());
        } catch (e) {

        }

        if (val == undefined) {
            this.refreshGroups();
        } else {
            $.each(val, function () {
                base.addControl(false, this);
            });
        }

        this.wrap.sortable({
            update: function (event, ui) {
                base.refreshGroups();
            }
        });
    }

    ListInput.prototype.refreshGroups = function () {
        this.groups = this.wrap.find('.listinput-group');
        if (this.groups.length < 1) {
            this.addControl(false);
        }
        this.updateValue();
    };

    ListInput.prototype.addControl = function (beforeElement, value) {
        var base = this;

        if (!value) {
            value = '';
        }

        var group = $('<li class="listinput-group" style="margin-top: 1px;">');
        var inputGroup = $('<div class="input-group">');
        var input = $('<input type="text" class="form-control listinput-input">').val(value);

        var buttonWrap = $('<span class="input-group-btn">');
        var removeButton = $('<button class="btn btn-default listinput-button listinput-remove-button" type="button"><span class="glyphicon glyphicon-minus"></span></button>');
        var addButton = $('<button class="btn btn-default listinput-button listinput-add-button" type="button"><span class="glyphicon glyphicon-plus"></span></button>');

        var sortAddon = $('<span style="cursor: move;" class="input-group-addon" id="basic-addon1"></span>');
        var sortIcon = $('<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>');

        if (!beforeElement) {
            this.wrap.append(group);
        } else {
            group.insertAfter(beforeElement);
        }

        group.append(inputGroup);

        inputGroup.append(input);

        inputGroup.append(buttonWrap);
        buttonWrap.append(removeButton);
        buttonWrap.append(addButton);

        inputGroup.prepend(sortAddon);
        sortAddon.append(sortIcon);

        removeButton.click(function () {
            group.remove();
            base.refreshGroups();

            var formGroup = base.element.parent();
            if(formGroup.hasClass('has-success')) {
                base.element.trigger('blur');
            }
        });

        addButton.click(function () {
            base.addControl($(this).parent().parent().parent());
        });

        input.keyup(function () {
            base.updateValue();
            var formGroup = base.element.parent();
            if(formGroup.hasClass('has-error')) {
                if(base.element.val()) {
                    formGroup.removeClass('has-error');
                    formGroup.find('.help-block').html('');
                }
            }

            if(formGroup.hasClass('has-success')) {
                if(!base.element.val()) {
                    formGroup.removeClass('has-success');
                }
            }
        });

        var fucsoutCallback = function() {
            setTimeout(function() {
                var focused = $(document.activeElement)[0];

                if(!$(focused).hasClass('listinput-input') && !$(focused).hasClass('listinput-button')) {
                    base.element.trigger('blur');
                }
            }, 100);
        };

        input.focusout(fucsoutCallback);
        addButton.focusout(fucsoutCallback);
        removeButton.focusout(fucsoutCallback);

        this.refreshGroups();
    };

    ListInput.prototype.updateValue = function () {
        var inputs = this.wrap.find('.listinput-input');
        var data = [];
        inputs.each(function () {
            if ($(this).val()) {
                data[data.length] = $(this).val();
            }
        });
        var val = JSON.stringify(data);
        this.element.val(val);
        if (this.element.val() == '[""]' || this.element.val() == '[]') {
            this.element.val('');
        }
    };

    ListInput.Defaults = {};

    $.fn.listinput = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('listinput');

            if (!data) {
                data = new ListInput(this, typeof option == 'object' && option);
                $this.data('listinput', data);
            }
        });
    };
})(window.jQuery);
