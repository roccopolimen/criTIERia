# cri-TIER-ia: A structured way to rank

The goal of **cri-TIER-ia** is simple: provide an additional mechanism for tier lists and ranking systems that incorporate a categorical grading system.



Let's use Television Shows as an example.

You would essentially make a rubric for evaluating TV Shows such as:

| Category                                             | Weight |
| ---------------------------------------------------- | ------ |
| Characters                                           | 25%    |
| Story                                                | 20%    |
| World Building                                       | 15%    |
| Themes                                               | 15%    |
| Visuals (Direction, Animation if applicable, Acting) | 15%    |
| Sounds (Vocals, Soundtrack, Sound Effects)           | 10%    |

After providing each category a score out of 10, the new show entry will now be given a grade, and assigned a TIER in a tier list based on the grade.

For example, a score of 82 would correlated to a B+ tier in my Tier List ranking.



After grading your entries, you can then go to the Tier List page and move the entries within each tier to any order you want. You should order the shows that you *subjectively* like better, towards the left-hand side of the row.



Finally, based on the order of shows in your tier list from left-to-right and top-to-bottom, an ordered ranking will be formed on the ranking page. You now not only have an easy way to rank your shows, but also the reasoning behind why you ranked shows in that order!

## Screenshots

![](C:\Users\rocco\Downloads\web-ss1.png)

![](C:\Users\rocco\Downloads\web-ss2.png)

![](C:\Users\rocco\Downloads\web-ss3.png)

![](C:\Users\rocco\Downloads\web-ss4.png)

![](C:\Users\rocco\Downloads\web-ss5.png)

![](C:\Users\rocco\Downloads\web-ss6.png)

## Roadmap

### Features

* Ability to rename entries w/o changing view order
* Implement non-privileged Access
  * Others can view scores w/o logging in, just can't edit
* Implement Edit Rubric page
  * Be able to change the weights/categories for rubric
  * Be able to change the score associated with each tier along with the tier's name
  * Update all the data to reflect these changes
  * Use stable adjustments when updating the tier list
* Implement sync scores page
  * Set up user auth w/ anilist API
  * allow syncing of Manga and Anime scores based on ID.
* Add About Page
  * Describe what the website does
  * Add screenshots to aid description
  * Describe myself (about me)
* Allow Comments per item
  * potentially sync comments to anilist API as well

### Major Bugs

* Switch to using HashRouter instead of BrowserRouter

  * this will help to get around 404 errors with how gh-pages does client side

* Use dnd-kit to implement Tier List

  * allow for grid drag and drop instead of only rows

  * wrap entries so they do not overflow container

* Allow names to have a slash in them

* Make entire site mobile friendly

* Anime/Manga categories should store anilist ID

  * avoid ambiguity

  * allow for more flexibility with name

### Minor Quality of Life Changes
* Press enter on image modal to change
* Show title and maybe image in the edit score modal
* Toggle to show percentage of each category in the table
* Keep plus from spinning (use plus icon instead of speed dial icon?)
* Adjust column width of the table to better match the data
