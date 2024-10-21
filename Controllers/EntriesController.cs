using ExpensesAPI.Data;
using ExpensesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ExpensesAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class EntriesController : ApiController
    {
        public IHttpActionResult GetEntries()
        {
			try
			{
                using (var context = new AppDbContext())
                {
                    var entries = context.Entries.ToList();
                    return Ok(entries);
                }
            }
			catch (Exception ex)
			{
                return BadRequest(ex.Message);
			}
        }

        public IHttpActionResult GetEntry(int id)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var entry = context.Entries.FirstOrDefault(e => e.Id == id);

                    if(entry == null) { return NotFound();  }

                    return Ok(entry);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IHttpActionResult PostEntry([FromBody] Entry entry)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                using (var context = new AppDbContext())
                {
                    context.Entries.Add(entry);
                    context.SaveChanges();

                    return Ok("Entry was created!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateEntry(int id, [FromBody] Entry entry)
        {
            if(!ModelState.IsValid) { return BadRequest(ModelState); }

            if(id != entry.Id) {  return BadRequest(ModelState); }

            try
            {
                using (var context = new AppDbContext())
                {
                    var oldEntry = context.Entries.FirstOrDefault(e => e.Id == id);

                    if (oldEntry == null) { return NotFound(); }

                    oldEntry.Description = entry.Description;
                    oldEntry.IsExpense = entry.IsExpense;
                    oldEntry.Value = entry.Value;

                    context.SaveChanges();

                    return Ok("Entry updated!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteEntry(int id) 
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var entry = context.Entries.FirstOrDefault(e => e.Id == id);

                    if (entry == null) { return NotFound(); }

                    context.Entries.Remove(entry);

                    context.SaveChanges();

                    return Ok("Entry deleted!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
