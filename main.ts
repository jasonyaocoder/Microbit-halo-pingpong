function showImage () {
    ImageIndex = ClockPixel % Images.length
    Images[ImageIndex].showImage(0)
}
function moveAmount () {
    return Direction2
}
function goClockPixel () {
    if (1 == ClockpixelChanged) {
        ClockpixelChanged = 0
    } else if (absDisance(SinglePixel, ClockPixel) < 1) {
        ClockPixel += moveAmount()
        ClockPixel = ledCappedIndex(ClockPixel)
        ClockpixelChanged = 1
        Color = randomColor()
        if (ClockPixel % 2 == 0) {
            music.playTone(262, music.beat(BeatFraction.Sixteenth))
        } else {
            music.playTone(330, music.beat(BeatFraction.Sixteenth))
        }
        showImage()
    } else {
    	
    }
}
function createImages () {
    Images = [images.iconImage(IconNames.Heart), images.iconImage(IconNames.SmallHeart), images.iconImage(IconNames.Yes), images.iconImage(IconNames.No), images.iconImage(IconNames.Happy), images.iconImage(IconNames.Sad), images.iconImage(IconNames.Confused), images.iconImage(IconNames.Angry), images.iconImage(IconNames.Asleep), images.iconImage(IconNames.Surprised), images.iconImage(IconNames.Silly), images.iconImage(IconNames.Fabulous), images.iconImage(IconNames.Silly), images.iconImage(IconNames.Meh), images.iconImage(IconNames.TShirt), images.iconImage(IconNames.Rollerskate), images.iconImage(IconNames.Duck), images.iconImage(IconNames.House), images.iconImage(IconNames.Tortoise), images.iconImage(IconNames.Butterfly), images.iconImage(IconNames.StickFigure)]
}
input.onButtonPressed(Button.A, function () {
    Direction2 = Direction2 * -1
})
function ledCappedIndex (Index: number) {
    return (Index + 24) % 24
}
function randomColor () {
    return neopixel.rgb(random255(), random255(), random255())
}
input.onButtonPressed(Button.B, function () {
    Speed += 1
    Speed = Speed % 3 + 0
})
function absDisance (num: number, num2: number) {
    return Math.abs(100 + num - (100 + num2))
}
function random255 () {
    return randint(0, 255)
}
let Images: Image[] = []
let ImageIndex = 0
let Speed = 0
let Direction2 = 0
let Color = 0
let ClockpixelChanged = 0
let ClockPixel = 0
let SinglePixel = 0
let Pixel = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
SinglePixel = 0
ClockPixel = 0
ClockpixelChanged = 0
Color = randomColor()
Direction2 = 1
Speed = 1
createImages()
basic.forever(function () {
    SinglePixel += moveAmount()
    SinglePixel = ledCappedIndex(SinglePixel)
    goClockPixel()
    Pixel.setPixelColor(SinglePixel, neopixel.colors(NeoPixelColors.Red))
    Pixel.setPixelColor(ClockPixel, Color)
    Pixel.setPixelColor(ledCappedIndex(ClockPixel + 1), Color)
    Pixel.setPixelColor(ledCappedIndex(ClockPixel + -1), Color)
    Pixel.show()
    Pixel.clear()
    basic.pause(100 * Speed)
})
