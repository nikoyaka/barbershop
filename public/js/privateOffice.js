jQuery(document).ready(function($) {

	$('#editForm_phoneNumber').mask('+7 (999) 999-99-99');
    
    // Отправляет данные из формы на сервер и получает ответ
    $('#editProfileForm').on('submit', function(event) {
        
        event.preventDefault();

        var form = $('#editProfileForm'),
            button = $('#button');

        $.ajax({
            url: '/profile',
            type: 'POST',
            data: form.serialize(),            
            success: function(result) {
                alert("Данные успешно сохранены");
                if (result.surname != "") $("#person_info_surname").text(result.surname);
                if(result.name != "") $("#person_info_name").text(result.name);
                if(result.patronymic != "") $("#person_info_patronymic").text(result.patronymic);
                if(result.phoneNumber != "") $("#person_info_phoneNumber").text(result.phoneNumber);
                if(result.mail != "") $("#person_info_email").text(result.mail);
            },
            error: function() {
                alert("Ошибка запроса");
                button.attr('disabled', false);
            }
        });
    });
});

$(document).on('click','.cancelRecord_btn', function(){
   let record = $(this).attr("value");
   let block = $(this).closest(".record_block");
   $.ajax({
            url: '/cancelRecord',
            type: 'POST',
            data: {
            	record: record
            },            
            success: function(result) {
                alert("Запись отменена");
                block.hide();
            },
            error: function() {
                alert("ошибка запроса");
            }
        });
 });