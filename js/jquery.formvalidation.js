function isValidEmail(email) {
	var emailRx = /^[\w\.-]+@[\w\.-]+\.\w+$/;
	return  emailRx.test(email);
}