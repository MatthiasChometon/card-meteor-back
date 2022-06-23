import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { GetCardInput } from './dto/get-card.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CardsListService } from './cardsList.service';
import { UpdateCardInput } from './dto/update-card.input';

@Resolver()
export class CardsResolver {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cardsListService: CardsListService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Card)
  createCard(
    @Args('createCardInput') createCardInput: CreateCardInput,
    @Args({ name: 'coverPicture', type: () => GraphQLUpload })
    coverPicture: FileUpload,
    @Args({ name: 'backgroundPicture', type: () => GraphQLUpload })
    backgroundPicture: FileUpload,
    @Context()
    context,
  ): Promise<Card> {
    const editor = context.req.user.username;
    return this.cardsService.create(
      createCardInput,
      coverPicture,
      backgroundPicture,
      editor,
    );
  }

  @Mutation(() => Card)
  updateCard(
    @Args('updateCardInput') updateCardInput: UpdateCardInput,
  ): Promise<Card> {
    return this.cardsService.updateOne(updateCardInput.id, updateCardInput);
  }

  @Query(() => [Card])
  cards(@Args('getCardInput') getCardInput?: GetCardInput): Promise<Card[]> {
    return this.cardsListService.get(getCardInput);
  }

  @Query(() => Card)
  @UseGuards(JwtAuthGuard)
  userCard(@Args('id') id: number, @Context() context): Promise<Card> {
    const editor = context.req.user.username;
    return this.cardsService.findOneOrError({ id, editor });
  }
}
