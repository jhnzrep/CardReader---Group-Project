namespace CardReaderAPI.Models
{
    public class User
    {
        private int id;
        private string name;
        private string rank;

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Rank { get => rank; set => rank = value; }

        public User()
        {
        }

        public User(int id, string name, string rank)
        {
            Id = id;
            Name = name;
            Rank = rank;
        }
    }
}
