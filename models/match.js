'use strict';
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define('match', {
    status: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    pet_id: DataTypes.INTEGER,
    pet_liked: DataTypes.INTEGER
  }, {});
  match.associate = function(models) {
    // associations can be defined here
  };
  return match;
};