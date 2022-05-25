import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @Mutation(() => Card)
  createCard(
    @Args('createCardInput') createCardInput: CreateCardInput,
  ): Promise<Card> {
    return this.cardsService.save(createCardInput);
  }

  @Mutation(() => Card)
  updateCard(
    @Args('updateCardInput') updateCardInput: UpdateCardInput,
  ): Promise<Card> {
    return this.cardsService.updateOne(updateCardInput.id, updateCardInput);
  }

  @Query(() => [Card])
  cards(@Args('name') name: string): Promise<Card[]> {
    return this.cardsService.get(name);
  }
}
