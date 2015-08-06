function isValidEmail(email) {
	var emailRx = /^[\w\.-]+@[\w\.-]+\.\w+$/;
	return  emailRx.test(email);
}

(function($){
	
	$.fn.formValidation = function(){
		
		return this.each(function(){

			var $form = $(this),
				$status = $form.find('.status'),
				$name = $form.find('#name'),
				$email = $form.find('#email'),
				$message = $form.find('#message'),
				$spam = $form.find('#spam'),
				$reset = $form.find('input[type=reset]'),
				$fields = $form.find('input[type=text], textarea');

			function seterror(errorMessage, $field){
				$status.html(errorMessage).show();
				$field.focus().addClass('error');				
			}
			// initailise
			$status.hide();

			$reset.click(function(){
				$status.hide();
				$fields.removeClass('error');
			});

			$form.submit(function(e){
				e.preventDefault();
				$fields.removeClass('error');

				if(!$name.val()){
					seterror("Please send me your name", $name);
				}else if(!$email.val()){
					seterror("Please send me your email", $email);				
				}else if( !isValidEmail($email.val()) ){
					seterror("Please send me your valid email", $email);
				}else if(!$message.val()){
					seterror("Please send me your message", $message);
				}else if($spam.val()){
					alert("your a robot");
				}else{
					$status.html("Computing").show();
					//send da email
					var formData = $form.serialize();
					$.post("send-mail.php",formData, function(sent){
						if(sent){
							alert("Your message has been eaten "+$name.val());
							$status.hide();
						}else{
							$status.html("Your computer has fried");
						}
					});
				}


			});

		});
	}	

})(jQuery)