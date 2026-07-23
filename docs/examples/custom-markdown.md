---
status: new
---

# Custom markdown components <Badge type="important" text="Custom Experimental" />

Custom built markdown components for this specific site.

## Github-flavored Alerts

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.


## Step list (Ordered list)

<Steps>

1. ### Install the prerequisites

   Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.

2. ### Prepare the printer

   Nulla ut lectus et metus egestas scelerisque ac aliquam orci. Vestibulum quis sem eros. Fusce sit amet laoreet sem. Morbi pellentesque non augue a porta. Curabitur nec lectus ligula. Suspendisse potenti. Fusce placerat varius rhoncus. Integer molestie consectetur velit sit amet commodo. Nunc pretium sit amet sem vel tempus. Phasellus tincidunt dapibus magna, at molestie diam bibendum a. Vivamus nec elit mattis nunc volutpat lobortis.

3. ### Install the K1V gantry

   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed nisi fringilla erat iaculis fermentum ut at odio. Ut tincidunt, sapien quis rhoncus finibus, ipsum neque posuere ex, nec dictum metus leo ac dui. In rutrum et lorem quis faucibus. Maecenas eu justo pulvinar purus condimentum facilisis. Curabitur fermentum ipsum tempor tincidunt eleifend.

4. ### Test the motion system

   Sed malesuada semper placerat. Vivamus consequat, lorem quis pellentesque pulvinar, massa velit eleifend metus, sit amet efficitur nibh lectus ac mi. Aenean tempor, quam vitae scelerisque vestibulum, massa mi condimentum enim, vel elementum ipsum justo a odio. Nunc viverra est sed purus fermentum, non euismod tellus eleifend. Proin sed laoreet sapien. Etiam at laoreet odio. Nulla finibus id ex ullamcorper vestibulum. Praesent odio nulla, scelerisque non tellus et, tristique venenatis sapien. Sed et pulvinar felis. Proin molestie arcu non quam placerat efficitur. Maecenas ut quam sollicitudin, mattis risus sit amet, aliquam arcu. Nullam quis accumsan massa.

</Steps>

## Badge Examples

## Blue <Badge type="info" text="Beta" />

## Green <Badge type="tip" text="Updated" />

## Purple <Badge type="important" text="Experimental" />

## Yellow <Badge type="warning" text="Preview" />


## Orange <Badge type="changed" text="Changed" />

## Red <Badge type="danger" text="Deprecated" />

## Gray <Badge type="neutral" text="Archived" />

---

Tags can also appear inside normal text:

This feature is <Badge type="info" text="Beta" />.

This documentation was recently <Badge type="tip" text="Updated" />.

This option is <Badge type="important" text="Experimental" />.

This feature is currently <Badge type="danger" text="Deprecated" />.

## Box containers

::: box
This is a neutral box.
:::

::: box-blue
This is a blue information box.
:::

::: box-brand
This uses the VectorLab amber brand color.
:::

::: box-green
This uses the same green as the Tip admonition.
:::

::: box-red
This is a red box.
:::

::: box-yellow
This is a yellow warning box.
:::
