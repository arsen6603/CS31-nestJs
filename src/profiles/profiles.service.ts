import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  profiles: Profile[] = [];

  create(createProfileDto) {
    let id = 1;

    if (this.profiles.length == 0) {
      id = 1;
    } else {
      id = this.profiles[this.profiles.length - 1].id + 1
    }

    const newProfile = {
      id: id,
      ...createProfileDto
    }

    this.profiles.push(newProfile)

    return { message: "User is created", profile: newProfile }
  }

  findAll() {
    return this.profiles;
  }

  findOne(id: number) {
    let existProfile;

    for (let profile of this.profiles) {
      if (profile.id === id) {
        existProfile = profile
        break;
      }
    }

    if (existProfile == undefined) {
      return { message: "User id not finded" }
    }

    return existProfile;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    let existProfile;
    let index;

    for (let i = 0; i < this.profiles.length; i++) {
      const profile = this.profiles[i];

      if (profile.id === id) {
        index = i
        existProfile = profile
      }
    }

    if (index != undefined) {
      existProfile = {
        ...existProfile,
        ...updateProfileDto
      }
    }


    this.profiles[index] = existProfile


    return {
      message: 'User is updated', profile: existProfile
    }
  }

  remove(id: number) {
    let existUser;

    this.profiles = this.profiles.filter((profile) => {
      if (profile.id !== id) return profile
      if (profile.id === id) {
        existUser = profile
      }
    })

    if (existUser == undefined) {
      return { message: 'User is not found' }
    }


    return { message: 'User is deleted' }
  }
}
