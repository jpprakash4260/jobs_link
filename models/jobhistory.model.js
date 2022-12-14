//-------------------------- JobHistory Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const JobHistory = sequelize.define(
      "JobHistory",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         job_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["P", "G"]
         },
         job_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         del_by: {
            type: DataTypes.STRING,
            allowNull: false
         },
         del_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         del_type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         status_from: {
            type: DataTypes.STRING,
            allowNull: false
         },
         to_status: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         ipaddress: {
            type: DataTypes.STRING,
            allowNull: false
         }
      },
      { updatedAt: 'del_date', createdAt: false, tableName: "tbl__jobhistory" }
   );
   return JobHistory;
};

//-------------------------- JobHistory Model End ------------------------------//
