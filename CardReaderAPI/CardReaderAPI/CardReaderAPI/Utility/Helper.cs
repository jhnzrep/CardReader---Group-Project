using CardReaderAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CardReaderAPI.Utility
{
    public abstract class Helper
    {
        protected const string connectionString = @"";

        public User GetUser(int id)
        {
            User entry = null;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var idstring = @"select * from Users where Id=@id";
                using (SqlCommand cmd = new SqlCommand(idstring, connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read()) entry = ReadNextUser(reader);
                    }
                }
            }
            return entry;
        }

        protected User ReadNextUser(SqlDataReader reader)
        {
            User user = new User();
            user.Id = reader.GetInt32(0);
            user.Name = reader.GetString(1);
            user.Rank = reader.GetString(2);
            return user;
        }

        protected Entry ReadNextEntry(SqlDataReader reader)
        {
            Entry entry = new Entry();
            entry.Id = reader.GetInt32(0);
            entry.Name = reader.GetString(1);
            entry.Rank = reader.GetString(2);
            entry.Time = reader.GetDateTime(3);
            return entry;
        }
    }
}
