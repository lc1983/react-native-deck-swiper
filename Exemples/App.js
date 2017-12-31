import React, {Component} from 'react'
import Swiper from 'react-native-deck-swiper'
import {Button, StyleSheet, Text, View, Dimensions} from 'react-native'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Exemple extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: ['1', '2', '3'],
      cardIndex: 0,
      disableSwiper: false,
      swiperKey: 0
    }
  }

  renderCard = card => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card}</Text>
      </View>
    )
  };

  onSwiped = async (previousCardIndex) => {
    console.log(`onSwiped::previousCardIndex=${previousCardIndex}`);
    // Disable swap for the last card (base card)
    if (previousCardIndex + 1 === this.state.cards.length - 1) {
      this.setState({
        //disableSwiper: true
      })
    }
  };

  onPostSwiped = async (previousCardIndex) => {
    console.log(`onPostSwiped::previousCardIndex=${previousCardIndex}`);
    const cards = this.state.cards.slice();
    cards.splice(previousCardIndex, 1);
    const cardIndex = previousCardIndex < cards.length ? previousCardIndex : 0;
    this.setState({
      cards: cards,
      cardIndex: cardIndex,
      swiperKey: this.state.swiperKey + 1
    });
  }

  tapCard = (location, cardIndex) => {
    const cardStyle = this.calculateCardStyle();
    if (location.x < cardStyle.width / 2) {
      this.jumpToCardIndex(cardIndex, true);
    } else {
      this.jumpToCardIndex(cardIndex, false);
    }
  };

  jumpToCardIndex = (cardIndex, jumpToPrevious) => {
    if ((jumpToPrevious && cardIndex === 0) ||
      (!jumpToPrevious && cardIndex === this.state.cards.length - 1)) {
        // TODO: Snooze current card
    } else {
      this.swiper.jumpToCardIndex(jumpToPrevious ? cardIndex - 1 : cardIndex + 1);
    }
  }

  calculateCardStyle = () => {
    const { height, width } = Dimensions.get('window');
    const marginTop = 0;
    const marginBottom = 0;
    const cardHorizontalMargin = 20;
    const cardVerticalMargin = 80;

    const cardWidth = width - cardHorizontalMargin * 2
    const cardHeight = height - cardVerticalMargin * 2 - marginTop - marginBottom

    return {
      top: cardVerticalMargin,
      left: cardHorizontalMargin,
      width: cardWidth,
      height: cardHeight
    }
  }

  render () {
    const swiper = this.state.cards.length > 0 && (
      <Swiper
        key={this.state.swiperKey}
        ref={swiper => {
          this.swiper = swiper
        }}
        backgroundColor='transparent'
        onSwiped={this.onSwiped}
        onPostSwiped={this.onPostSwiped}
        onTapCard={this.tapCard}
        cards={this.state.cards}
        cardIndex={this.state.cardIndex}
        cardHorizontalMargin={20}
        cardVerticalMargin={80}
        renderCard={this.renderCard}
        horizontalSwipe={!this.state.disableSwiper}
        verticalSwipe={!this.state.disableSwiper}
        cardStyle={this.calculateCardStyle()}
        infinite={false}
        showSecondCard={true}
        overlayLabels={{
          bottom: {
            title: 'BLEAH',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          },
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30
              }
            }
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
              }
            }
          },
          top: {
            title: 'SUPER LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          }
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
      >
      </Swiper>
    )

    return (
      <View style={styles.container}>
        {swiper}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#58C1EE'
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
