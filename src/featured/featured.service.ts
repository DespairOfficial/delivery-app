import { FeaturedRepository } from './featured.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeaturedService {
	constructor(private featuredRepository: FeaturedRepository){}
	getFeatured(){
		return this.featuredRepository.find()
	}
}
