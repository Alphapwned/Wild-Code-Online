// Écrire une fonction extractValidationsErrors
// qui prend en paramètre un tableau d'erreurs, comme ci-dessous
// et en sortie, Record<string, string[]> (les erreurs, pour chaque propriété, sous forme de tableau).
export const extractValidationsErrors = (
  errors: any
): Record<string, string[]> => {
  // 1. Initialiser un objet vide, appelé `errors`, de type Record<string, string[]>. Cet objet va contenir les erreurs.
  // 2. Pour chaque erreur, on va extraire la propriété et le message d'erreur.
  // À chaque fois qu'on tombe sur une erreur,
  //    -> si la @property n'existe pas dans `errors`, on l'initialise à un tableau vide, auquel on ajoute le message d'erreur
  //    -> si la @property existe dans `errors`, on ajoute le message d'erreur au tableau existant
  //  On peut se baser sur example[0].
  //  On fait une boucle sur extensions.exception.validationErrors.
  //  Pour chaque erreur de `validationErrors`, on boucle sur les clés (Object.keys(something)) de `constraints`.

  // 3. On retourne l'objet `errors`

  // Soit l'object suivant :
  // constraints: {
  //   IsUniqueConstraint:
  //     "L'email choisi éxiste déjà. Merci d'en choisir un autre",
  //   MinLengthConstraint:
  //     "Le mot de passe doit contenir au moins 8 caractères",
  // },

  // Object.keys(constraints) === ["IsUniqueConstraint", "MinLengthConstraint"]
  // for (const constraint of Object.keys(constraints)) {
  //   console.log(constraints[constraint]); Cherche la valeur de la clé
  // }
  //
  const formattedErrors: Record<string, string[]> = {};

  for (const error of errors) {
    const validationErrors = error.extensions.exception.validationErrors;

    for (const validationError of Object.keys(validationErrors)) {
      const errorMessage = validationErrors[validationError];
      const property = errorMessage.property;

      // On boucle sur les contraints, et on les ajoute
      for (const constraintKey of Object.keys(errorMessage.constraints)) {
        /* Logique d'ajout */
        if (!formattedErrors[property]) {
          formattedErrors[property] = [];
        }

        formattedErrors[property].push(errorMessage.constraints[constraintKey]);
        /* */
      }
    }
  }

  return formattedErrors;
};
// Si jamais tu veux procéder par des tests, tu peux utiliser le package jest
