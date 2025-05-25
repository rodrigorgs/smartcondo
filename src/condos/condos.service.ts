import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCondoDto } from './dto/create-condo.dto';
import { Repository } from 'typeorm';
import { Condo } from './entities/condo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CondoToUser } from './entities/condo-to-user.entity';
import { AddUserToCondoDto } from './dto/add-user-to-condo.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class CondosService {
  constructor(
    @InjectRepository(Condo) private condosRepository: Repository<Condo>,
    @InjectRepository(CondoToUser) private condoToUsersRepository: Repository<CondoToUser>,
    private usersService: UsersService,
  ) { }

  async create(createCondoDto: CreateCondoDto) {
    const existingCondo = await this.findOneBySlug(createCondoDto.slug);
    if (existingCondo) {
      throw new ConflictException('Condo with this slug already exists');
    }
    const condo = this.condosRepository.create(createCondoDto);
    return this.condosRepository.save(condo);
  }

  findOne(id: number) {
    return this.condosRepository.findOneBy({ id });
  }

  findOneBySlug(slug: string) {
    return this.condosRepository.findOne({ where: { slug } });
  }

  findCondoToUserBySlug(condoSlug: string, userId: number) {
    return this.condoToUsersRepository.findOne({
      where: {
        user: { id: userId },
        condo: { slug: condoSlug }
      },
      relations: ['condo', 'user']
    });
  }

  findUsers(condoId: number) {
    return this.condoToUsersRepository.find({
      where: { condo: { id: condoId } },
      relations: ['user'],
    });
  }

  findCondoToUser(condoId: number, userId: number) {
    return this.condoToUsersRepository.findOne({ where: { user: { id: userId }, condo: { id: condoId } }, relations: ['condo', 'user'] });
  }

  async addOrUpdateUser(condoId: number, userId: number, dto: AddUserToCondoDto) {
    let condoToUser = await this.findCondoToUser(condoId, userId);
    if (condoToUser) {
      condoToUser = { ...condoToUser, ...dto };
    } else {
      condoToUser = this.condoToUsersRepository.create({ condo: { id: condoId }, user: { id: userId }, ...dto });
    }
    return this.condoToUsersRepository.save(condoToUser);
  }

  async addUserByEmail(
    condoSlug: string,
    email: string,
    dto: AddUserToCondoDto,
  ) {
    const condo = await this.findOneBySlug(condoSlug);
    if (!condo) {
      throw new ConflictException('Condo not found');
    }

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new ConflictException('User not found');
    }

    // Check if user is already associated with the condo
    const existingCondoToUser = await this.findCondoToUser(condo.id, user.id);
    if (existingCondoToUser) {
      throw new ConflictException('User is already associated with this condo');
    }

    // Create new association
    const condoToUser = this.condoToUsersRepository.create({
      condo: { id: condo.id },
      user: { id: user.id },
      isManager: dto.isManager || false,
    });
    return this.condoToUsersRepository.save(condoToUser);
  }

  removeUser(condoId: number, userId: number) {
    return this.condoToUsersRepository.delete({ condo: { id: condoId }, user: { id: userId } });
  }

  async findByUser(userId: number) {
    // Return all condos associated to the user via condoToUser
    const condoToUsers = await this.condoToUsersRepository.find({
      where: { user: { id: userId } },
      relations: ['condo'],
    });
    return condoToUsers.map((ctu) => ctu.condo);
  }

  async findAll() {
    return this.condosRepository.find();
  }

  // update(id: number, updateCondoDto: UpdateCondoDto) {
  //   return `This action updates a #${id} condo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} condo`;
  // }
}
