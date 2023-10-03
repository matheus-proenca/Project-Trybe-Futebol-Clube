import TeamsModel from '../database/models/TeamsModel';

type Team = {
  id: number,
  teamName: string,
};

type ServiceError = {
  status: number,
  data: { message: string }
};

type ServiceSucesseful<T> = {
  status: number,
  data: T
};

type ServiceStatus<T> = ServiceError | ServiceSucesseful<T>;

class ServiceTeams {
  getAllTeams = async ():Promise<ServiceStatus<Team[]>> => {
    const findAllTeams = await TeamsModel.findAll();
    const teamsJson = findAllTeams.map((e) => e.toJSON());
    return { status: 200, data: teamsJson };
  };
}

export default ServiceTeams;
