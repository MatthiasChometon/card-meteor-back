import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { GetCardInput } from './dto/get-card.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CardsListService } from './cardsList.service';
import { UpdateCardInput } from './dto/update-card.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  updateUserCard(
    @Args('updateCardInput') updateCardInput: UpdateCardInput,
    @Args({ name: 'coverPicture', type: () => GraphQLUpload })
    coverPicture: FileUpload,
    @Context()
    context,
    @Args({
      name: 'backgroundPicture',
      type: () => GraphQLUpload,
      nullable: true,
    })
    backgroundPicture: FileUpload,
  ): Promise<Card> {
    const editor = context.req.user.username;
    const id = updateCardInput.id;
    return this.cardsService.updateOne(
      { editor, id },
      updateCardInput,
      coverPicture,
      backgroundPicture,
    );
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
