'use strict'
const db = require("../Models")

class GovtJobPostService { }

GovtJobPostService.create = async (obj) => {
   try {
      const saved = await db.GovernmentJobPostExp.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

GovtJobPostService.findAllAndCount = async (unrst_jid) => {
   try {
      const findAllandCount = await db.GovernmentJobPostExp.findAndCountAll({ where: { unrst_jid: unrst_jid } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

GovtJobPostService.getCollegeDetails = async (unrst_jid, posted_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__govtjobpost_exp as a 
                where 
                a.unrst_jid=${unrst_jid} and a.posted_status='${posted_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

GovtJobPostService.findByPk = async (unrst_jid) => {
   try {
      const findByPk = await db.GovernmentJobPostExp.findByPk(unrst_jid)
      return findByPk
   }
   catch (err) {
      return err
   }
}

GovtJobPostService.update = async (unrst_jid, obj) => {
   try {

      const ext_govtjobpost_exp = await db.GovernmentJobPostExp.findOne({ where: obj })

      if (ext_govtjobpost_exp && unrst_jid == ext_govtjobpost_exp.unrst_jid) {

         return 'Exited Values'
      }
      else if (!ext_govtjobpost_exp || (ext_govtjobpost_exp && unrst_jid != ext_govtjobpost_exp.unrst_jid)) {

         const updateById = await db.GovernmentJobPostExp.update(obj, { where: { unrst_jid: unrst_jid } })
         return updateById[0]

      }
      else return 'GovernmentJobPostExp Not Found'
   }
   catch (err) {
      return err
   }
}

GovtJobPostService.delete = async (unrst_jid) => {
   try {
      const founded = await db.GovernmentJobPostExp.findByPk(unrst_jid)
      if (founded) {
         const deleted = await db.GovernmentJobPostExp.destroy({ where: { unrst_jid: unrst_jid } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = GovtJobPostService