import React, { useRef } from 'react';

export const scriptures: Record<string, string> = {
  "Genesis 3:15": "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.",
  "Deuteronomy 24:16": "The fathers shall not be put to death for the children, neither shall the children be put to death for the fathers: every man shall be put to death for his own sin.",
  "Galatians 3:16": "Now to Abraham and his seed were the promises made. He saith not, And to seeds, as of many; but as of one, And to thy seed, which is Christ.",
  "Galatians 3:29": "And if ye be Christ's, then are ye Abraham's seed, and heirs according to the promise.",
  "Ephesians 2:15": "Having abolished in his flesh the enmity, even the law of commandments contained in ordinances; for to make in himself of twain one new man, so making peace;",
  "Romans 6:23": "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.",
  "Matthew 16:18": "And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it.",
  "Colossians 1:18": "And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence.",
  "Luke 8:11": "Now the parable is this: The seed is the word of God.",
  "Isaiah 63:10": "But they rebelled, and vexed his holy Spirit: therefore he was turned to be their enemy, and he fought against them.",
  "Jeremiah 1:9": "Then the Lord put forth his hand, and touched my mouth. And the Lord said unto me, Behold, I have put my words in thy mouth.",
  "2 Peter 1:21": "For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost.",
  "John 3:5": "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
  "Galatians 2:20": "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.",
  "John 10:9": "I am the door: by me if any man enter in, he shall be saved, and shall go in and out, and find pasture.",
  "John 10:16": "And other sheep I have, which are not of this fold: them also I must bring, and they shall hear my voice; and there shall be one fold, and one shepherd.",
  "1 Peter 4:17": "For the time is come that judgment must begin at the house of God: and if it first begin at us, what shall the end be of them that obey not the gospel of God?",
  "1 Corinthians 11:29": "For he that eateth and drinketh unworthily, eateth and drinketh damnation to himself, not discerning the Lord's body.",
  "1 Corinthians 11:32": "But when we are judged, we are chastened of the Lord, that we should not be condemned with the world.",
  "2 Corinthians 13:5": "Examine yourselves, whether ye be in the faith; prove your own selves. Know ye not your own selves, how that Jesus Christ is in you, except ye be reprobates?",
  "Isaiah 40:22": "It is he that sitteth upon the circle of the earth, and the inhabitants thereof are as grasshoppers; that stretcheth out the heavens as a curtain, and spreadeth them out as a tent to dwell in:",
  "Job 26:7": "He stretcheth out the north over the empty place, and hangeth the earth upon nothing.",
  "Isaiah 40:8": "The grass withereth, the flower fadeth: but the word of our God shall stand for ever.",
  "John 17:3": "And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.",
  "1 Corinthians 8:6": "But to us there is but one God, the Father, of whom are all things, and we in him; and one Lord Jesus Christ, by whom are all things, and we by him.",
  "Deuteronomy 9:10": "And the Lord delivered unto me two tables of stone written with the finger of God; and on them was written according to all the words, which the Lord spake with you in the mount out of the midst of the fire in the day of the assembly.",
  "Exodus 34:27": "And the Lord said unto Moses, Write thou these words: for after the tenor of these words I have made a covenant with thee and with Israel.",
  "Jeremiah 30:2": "Thus speaketh the Lord God of Israel, saying, Write thee all the words that I have spoken unto thee in a book.",
  "Revelation 8:1": "And when he had opened the seventh seal, there was silence in heaven about the space of half an hour.",
  "Luke 24:39": "Behold my hands and my feet, that it is I myself: handle me, and see; for a spirit hath not flesh and bones, as ye see me have.",
  "1 Timothy 1:17": "Now unto the King eternal, immortal, invisible, the only wise God, be honour and glory for ever and ever. Amen.",
  "John 4:24": "God is a Spirit: and they that worship him must worship him in spirit and in truth.",
  "1 John 3:20": "For if our heart condemn us, God is greater than our heart, and knoweth all things.",
  "Psalm 90:2": "Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God.",
  "Exodus 34:6": "And the Lord passed by before him, and proclaimed, The Lord, The Lord God, merciful and gracious, longsuffering, and abundant in goodness and truth,",
  "Isaiah 54:10": "For the mountains shall depart, and the hills be removed; but my kindness shall not depart from thee, neither shall the covenant of my peace be removed, saith the Lord that hath mercy on thee.",
  "Exodus 3:14": "And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you.",
  "John 8:40": "But now ye seek to kill me, a man that hath told you the truth, which I have heard of God: this did not Abraham.",
  "1 Timothy 2:5": "For there is one God, and one mediator between God and men, the man Christ Jesus;",
  "Hosea 11:9": "I will not execute the fierceness of mine anger, I will not return to destroy Ephraim: for I am God, and not man; the Holy One in the midst of thee: and I will not enter into the city.",
  "John 19:28": "After this, Jesus knowing that all things were now accomplished, that the scripture might be fulfilled, saith, I thirst.",
  "John 4:6": "Now Jacob's well was there. Jesus therefore, being wearied with his journey, sat thus on the well: and it was about the sixth hour.",
  "John 11:35": "Jesus wept.",
  "Mark 13:32": "But of that day and that hour knoweth no man, no, not the angels which are in heaven, neither the Son, but the Father.",
  "Matthew 28:18": "And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth.",
  "Philippians 2:9": "Wherefore God also hath highly exalted him, and given him a name which is above every name:",
  "Isaiah 43:5": "Fear not: for I am with thee: I will bring thy seed from the east, and gather thee from the west;",
  "Romans 10:15": "And how shall they preach, except they be sent? as it is written, How beautiful are the feet of them that preach the gospel of peace, and bring glad tidings of good things!",
  "Mark 4:11": "And he said unto them, Unto you it is given to know the mystery of the kingdom of God: but unto them that are without, all these things are done in parables:",
  "Ephesians 1:9": "Having made known unto us the mystery of his will, according to his good pleasure which he hath purposed in himself:",
  "Revelation 7:2": "And I saw another angel ascending from the east, having the seal of the living God: and he cried with a loud voice to the four angels, to whom it was given to hurt the earth and the sea,",
  "Isaiah 46:11": "Calling a ravenous bird from the east, the man that executeth my counsel from a far country: yea, I have spoken it, I will also bring it to pass; I have purposed it, I will also do it.",
  "Ecclesiastes 12:13": "Let us hear the conclusion of the whole matter: Fear God, and keep his commandments: for this is the whole duty of man.",
  "1 Thessalonians 4:16": "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first:",
  "Revelation 20:6": "Blessed and holy is he that hath part in the first resurrection: on such the second death hath no power, but they shall be priests of God and of Christ, and shall reign with him a thousand years.",
  "Revelation 20:12": "And I saw the dead, small and great, stand before God; and the books were opened: and another book was opened, which is the book of life: and the dead were judged out of those things which were written in the books, according to their works.",
  "Romans 2:16": "In the day when God shall judge the secrets of men by Jesus Christ according to my gospel.",
  "Romans 2:12": "For as many as have sinned without law shall also perish without law: and as many as have sinned in the law shall be judged by the law;",
  "Luke 10:20": "Notwithstanding in this rejoice not, that the spirits are subject unto you; but rather rejoice, because your names are written in heaven.",
  "Revelation 3:5": "He that overcometh, the same shall be clothed in white raiment; and I will not blot out his name out of the book of life, but I will confess his name before my Father, and before his angels.",
  "Galatians 3:27": "For as many of you as have been baptized into Christ have put on Christ.",
  "Revelation 21:1-4": "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.",
  "Matthew 24:6": "And ye shall hear of wars and rumours of wars: see that ye be not troubled: for all these things must come to pass, but the end is not yet.",
  "Matthew 24:42": "Watch therefore: for ye know not what hour your Lord doth come.",
  "Matthew 4:2": "And when he had fasted forty days and forty nights, he was afterward an hungred.",
  "Matthew 8:24": "And, behold, there arose a great tempest in the sea, insomuch that the ship was covered with the waves: but he was asleep.",
  "Matthew 27:50": "Jesus, when he had cried again with a loud voice, yielded up the ghost.",
};

export const ScriptureLink: React.FC<{ verse: string; children: React.ReactNode; onHover: (verse: string | null, x: number, y: number) => void }> = ({ verse, children, onHover }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  return (
    <span 
      ref={ref}
      className="scripture-link" 
      onMouseEnter={() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          onHover(verse, rect.left + rect.width / 2, rect.top);
        }
      }}
      onMouseLeave={() => onHover(null, 0, 0)}
    >
      {children}
    </span>
  );
};
