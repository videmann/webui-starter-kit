$(document).ready(function(){
    
    // конфиг
    var config = (function() {
        return {
            ymSensor: 'XXXXXX'
        }
    })();

    // form validation
    var forms = (function() {
        var validation = $('form').validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                agreement: {
                    required: true
                }
            },
            submitHandler: function() {
                var currentForm = $($(this)[0].currentForm),
                    goal = currentForm.data('goal');

                $.ajax({
                    url: 'https://httpbin.org/post', // Заменить на свой
                    method: 'POST',
                    data: currentForm.serialize(),
                    beforeSend: function(){},
                    error: function(){},
                    success: function(){

                        // yandexMetrica ReachGoal
                        ym(config.ymSensor, 'reachGoal', goal, {});
                    }
                })
            }
        });

        return {
            validation: validation
        }
    })(jQuery)

    $(document).on('close', function() {
        forms.validation.destroy()
    })
});