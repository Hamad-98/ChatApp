/*
Function returns an array of emails that are not equal to the login users email
so if its just two ppl, then the function is going to return one element, which is the receipientemail
thats why we are using [0] at the end

*/

const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];

export default getRecipientEmail;
