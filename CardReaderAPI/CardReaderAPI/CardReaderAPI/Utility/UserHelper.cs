using CardReaderAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CardReaderAPI.Utility
{
    public class UserHelper : Helper
    {

        public UserHelper()
        {

        }

        public IEnumerable<User> GetUsers()
        {
            const string getall = @"Select * from Users";
            List<User> list = new List<User>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand cmd = new SqlCommand(getall, connection))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        User user = ReadNextUser(reader);
                        list.Add(user);
                    }
                    reader.Close();
                }
            }
            return list;
        }

        public void Insert(User user)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "INSERT INTO dbo.Users(Id, Name, Rank) Values(@params1, @params2, @params3)";
                    cmd.Parameters.AddWithValue("@params1", user.Id);
                    cmd.Parameters.AddWithValue("@params2", user.Name);
                    cmd.Parameters.AddWithValue("@params3", user.Rank);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
