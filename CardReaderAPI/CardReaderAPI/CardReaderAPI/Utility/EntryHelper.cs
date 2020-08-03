using CardReaderAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CardReaderAPI.Utility
{
    public class EntryHelper:Helper
    {
        public EntryHelper()
        {

        }
        public IEnumerable<Entry> Get()
        {
            const string getall = @"Select * from Entry";
            List<Entry>list = new List<Entry>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand cmd = new SqlCommand(getall, connection))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Entry entry = ReadNextEntry(reader);
                        list.Add(entry);
                    }
                    reader.Close();
                }
            }
            return list;   
        }

        public List<Entry> Get(int id)
        {
            List<Entry> list = new List<Entry>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var idstring = @"select * from Entry where Id=@id";
                using (SqlCommand cmd = new SqlCommand(idstring, connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Entry entry = ReadNextEntry(reader);
                        list.Add(entry);
                    }
                    reader.Close();
                }
            }
            return list;
        }

        public void Insert(Entry entry)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "INSERT INTO dbo.Entry(Id, Name, Rank, Time) Values(@params1, @params2, @params3, @params4)";
                    cmd.Parameters.AddWithValue("@params1", entry.Id);
                    cmd.Parameters.AddWithValue("@params2", entry.Name);
                    cmd.Parameters.AddWithValue("@params3", entry.Rank);
                    cmd.Parameters.AddWithValue("@params4", entry.Time);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
