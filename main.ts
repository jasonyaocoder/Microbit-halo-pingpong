function moveAmount () {
    return Speed * Direction2
}
function randomImage () {
    ImageIndex = randint(0, 5)
    if (ImageIndex == 0) {
        basic.showIcon(IconNames.Tortoise)
    } else if (ImageIndex == 1) {
        basic.showIcon(IconNames.Butterfly)
    } else if (ImageIndex == 2) {
        basic.showIcon(IconNames.Giraffe)
    } else if (ImageIndex == 3) {
        basic.showIcon(IconNames.Duck)
    } else {
        basic.showIcon(IconNames.Heart)
    }
}
function goClockPixel () {
    if (1 == ClockpixelChanged) {
        ClockpixelChanged = 0
    } else if (absDisance(SinglePixel, ClockPixel) < Speed) {
        ClockPixel += moveAmount()
        ClockPixel = ledCappedIndex(ClockPixel)
        ClockpixelChanged = 1
        Color = randomColor()
        if (ClockPixel % 2 == 0) {
            music.playTone(262, music.beat(BeatFraction.Sixteenth))
        } else {
            music.playTone(330, music.beat(BeatFraction.Sixteenth))
        }
    } else {
    	
    }
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
    Speed = Speed % 3 + 1
})
function absDisance (num: number, num2: number) {
    return Math.abs(100 + num - (100 + num2))
}
function random255 () {
    return randint(0, 255)
}
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
})
