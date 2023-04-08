import PasswordValidator from "password-validator";

var schema = new PasswordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits();

export default function passwordValidator(password: string): boolean {
  var result = schema.validate(password) as boolean;

  return result;
}
