using DatabaseContext;

namespace Repositories;

public class Repositories
{
    public readonly UsersRepository UserRepository;
    public readonly ChakatonRepository ChakatonRepository;
    public readonly TeamRepository TeamRepository;
    public readonly RequestsRepository RequestsRepository;
    
    public Repositories(Database database)
    {
        UserRepository = new UsersRepository(database);
        ChakatonRepository = new ChakatonRepository(database);
        TeamRepository = new TeamRepository(database);
        RequestsRepository = new RequestsRepository(database);
    }
}