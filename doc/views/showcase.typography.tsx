import { defineComponent } from 'vue'
import { LctCard, LctCardContent, LctMica } from '../../lib'

const TypographyShowcase = defineComponent({
  setup () {
    return () => (
      <div>
        <LctCard overHidden radius={28} withMargin>
          <LctMica>
            <LctCardContent>
              <h1>Typography</h1>
              <p>We love texting.</p>
            </LctCardContent>
          </LctMica>
        </LctCard>

        <LctCard withMargin>
          <div>
            <h1>Display Large</h1>
            <h2>Display Medium</h2>
            <h3>Display Small</h3>
            <h4>Headline Large</h4>
            <h5>Headline Medium</h5>
            <h6>Headline Small</h6>
          </div>

          <article>
            <h1>Typography</h1>
            <p>Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing (leading), and letter-spacing (tracking), and adjusting the space between pairs of letters (kerning). The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process. Type design is a closely related craft, sometimes considered part of typography; most typographers do not design typefaces, and some type designers do not consider themselves typographers. Typography also may be used as an ornamental and decorative device, unrelated to the communication of information.</p>
            <p>Typography is the work of typesetters (also known as compositors), typographers, graphic designers, art directors, manga artists, comic book artists, and, now, anyone who arranges words, letters, numbers, and symbols for publication, display, or distribution, from clerical workers and newsletter writers to anyone self-publishing materials. Until the Digital Age, typography was a specialized occupation. Digitization opened up typography to new generations of previously unrelated designers and lay users. As the capability to create typography has become ubiquitous, the application of principles and best practices developed over generations of skilled workers and professionals has diminished. Thus, at a time when scientific techniques can provide evidence that supports established practice (legibility or brand recognition achieved through the appropriate use of serifs, letter case, letter forms, contrast, spacing, etc.) through understanding the limitations of human vision, typography may be encountered that fails to achieve its principal objective: effective communication.</p>
          </article>
        </LctCard>
      </div>
    )
  }
})

export {
  TypographyShowcase
}
