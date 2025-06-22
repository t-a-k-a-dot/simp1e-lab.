---
title: 'Markdown Writing Guide for Delicious Recipes'
description: 'Learn Markdown basics through a delicious pasta recipe'
pubDate: 2025-04-30
tags: ['Markdown', 'Guide', 'Food']
heroImage: 'Markdown-syntax-guide.webp'
ogImage: 'Markdown-syntax-guide.webp'
---

This guide will show you how to format text using Markdown through a delicious pasta recipe. Let's explore the world of food while learning Markdown syntax!

## Basic Syntax Demonstration

### Heading Levels

In recipes, we often need different levels of headings to organize content. Markdown provides six heading levels:

```markdown
# Classic Garlic Bacon Pasta
## Ingredients Preparation
### Main Ingredients
#### Seasonings
##### Kitchen Tools
###### Tips
```

### Text Formatting

When describing recipes, we often need to emphasize certain important information:

**Important steps** need to be bold
*Critical timing* uses italics
***Special notes*** use both bold and italics
~~Optional steps~~ use strikethrough

```markdown
**Important steps** need to be bold
*Critical timing* uses italics
***Special notes*** use both bold and italics
~~Optional steps~~ use strikethrough
```

### Lists Usage

#### Ingredients List (Unordered List):

- Pasta 400g
- Bacon 200g
  - Preferably with a good mix of fat and lean
  - Cut into small pieces
- Minced garlic 3-4 cloves
- Olive oil 2 tablespoons

```markdown
- Pasta 400g
- Bacon 200g
  - Preferably with a good mix of fat and lean
  - Cut into small pieces
- Minced garlic 3-4 cloves
- Olive oil 2 tablespoons
```

#### Cooking Steps (Ordered List):

1. Boil water with a pinch of salt
2. Add pasta, cook until 80% done
3. Meanwhile, prepare the sauce:
   1. Heat oil in pan
   2. Sauté minced garlic
   3. Add bacon and stir-fry

```markdown
1. Boil water with a pinch of salt
2. Add pasta, cook until 80% done
3. Meanwhile, prepare the sauce:
   1. Heat oil in pan
   2. Sauté minced garlic
   3. Add bacon and stir-fry
```

### Blockquotes

> Chef's tip: Add a bit of olive oil to the boiling water to prevent the pasta from sticking together.
>
> Remember to save some pasta water, it can be used to adjust the sauce consistency.

```markdown
> Chef's tip: Add a bit of olive oil to the boiling water to prevent the pasta from sticking together.
> 
> Remember to save some pasta water, it can be used to adjust the sauce consistency.
```

### Code Blocks

Can be used to show precise ingredient ratios or timing:

```python
# Ingredient Calculator
def calculate_ingredients(servings):
    base_pasta = 100  # grams/person
    base_bacon = 50   # grams/person
    
    return {
        "pasta": base_pasta * servings,
        "bacon": base_bacon * servings
    }
```

### Tables

Nutritional Information:

| Nutrient | Amount (per 100g) | % Daily Value |
|----------|------------------|---------------|
| Calories | 157 kcal         | 7.85%         |
| Protein  | 5.7g             | 9.5%          |
| Carbs    | 21.6g            | 7.2%          |

### Links and Images

For more culinary inspiration, visit: [Food Forum](https://example.com/cooking "Food Forum")

Final dish presentation:
![Pasta dish](~/assets/images/md-configuration/food.webp)(style:width:50%)

### Horizontal Rule

Used to separate different content sections:

---

### Inline Code

Pasta cooking time: `8-10 minutes`, maintain an `al dente` texture.

### Math Formulas

Ingredient ratio calculation: $amount = base \ amount \times number \ of \ servings$

Calorie calculation formula:

$$
Total\ calories = \sum(ingredient\ weight \times calories\ per\ gram)
$$

### Task Lists

Preparation checklist:

- [x] Purchase ingredients
- [x] Wash and cut ingredients
- [ ] Prepare cooking utensils
- [ ] Preheat oven

### Footnotes

This dish is inspired by traditional Italian recipes[^1].

[^1]: From "100 Classic Italian Pasta Dishes", page 23.

Finally, I hope this food-themed Markdown guide helps you better understand and use Markdown syntax. Remember, just like cooking, practice makes perfect! Happy writing! 👨‍🍳👩‍🍳

You can find this file: `src/content/posts/markdown-syntax-guide.md` in the project and learn it based on the rendering results.
