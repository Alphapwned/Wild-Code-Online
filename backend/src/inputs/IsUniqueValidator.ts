import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { UsersModels } from "../models/UsersModels";

@ValidatorConstraint({ async: true })
class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    console.log("args", args.value);
    const [relatedPropertyName] = args.constraints;
    const object = args.object as UsersModels;

    const existingUser = await UsersModels.findOne({
      where: { [relatedPropertyName]: value },
    });
    if (existingUser !== null && existingUser.id !== object.id) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args?.constraints;
    return `${JSON.stringify(relatedPropertyName)} doit être unique`;
  }
}

export function IsUnique(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: "isUnique",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsUniqueConstraint,
    });
  };
}
