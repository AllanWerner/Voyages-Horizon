const AppError = require('./AppError');

const errorHandler = (err, req, res, next) => {
  // Log l'erreur
  console.error('ERROR:', {
    timestamp: new Date().toISOString(),
    name: err.name,
    message: err.message,
    statusCode: err.statusCode,
    method: req.method,
  });

  // Format par défaut
  const response = {
    success: false,
    error: err.message || 'Erreur serveur'
  };

  // Gestion des erreurs Sequelize

  //Erreur de validation
  if (err.name === 'SequelizeValidationError') {
    response.error = 'Erreur de validation';
    response.details = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(response);
  }

  //Erreur lié à l'unicité des valeurs d'un attribut
  if (err.name === 'SequelizeUniqueConstraintError') {
    response.error = 'Conflict - Donnée déjà existante';
    response.details = err.errors[0]?.message;
    return res.status(409).json(response);
  }

  
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    response.error = 'Erreur de clé étrangère';
    response.message = 'La ressource référencée n\'existe pas';
    return res.status(400).json(response);
  }

  if (err.name === 'SequelizeDatabaseError') {
    response.error = 'Erreur base de données';
    return res.status(400).json(response);
  }

  // Gestion des AppError personnalisées
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(response);
  }

  // Erreur 404
  if (err.statusCode === 404) {
    return res.status(404).json(response);
  }

};

module.exports =  errorHandler;