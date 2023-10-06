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
    return { status: 200, data: findAllTeams };
  };

  getTeamById = async (id: string):Promise<ServiceStatus<Team | undefined>> => {
    const findById = await TeamsModel.findByPk(id);
    console.log(id);
    if (!findById) {
      return { status: 402, data: { message: 'Time inexistente' } };
    }
    return { status: 200, data: findById };
  };
}

export default ServiceTeams;
