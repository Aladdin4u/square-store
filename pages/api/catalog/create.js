import { Client } from 'square';
import { randomUUID } from 'crypto';

const { catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});

export default async function handler(req, res) {
  
  if ( req.method === 'POST' ) {
    try {
        const response = await catalogApi.upsertCatalogObject({
          idempotencyKey: randomUUID(),
          batches: [
            {
              objects: [
                {
                  type: 'ITEM_OPTION',
                  id: '#item_option_color',
                  itemOptionData: {
                    name: 'COLOR_OPTIONS',
                    values: [
                      {
                        type: 'ITEM_OPTION_VAL',
                        id: '#item_option_value_color_red',
                        itemOptionValueData: {
                          name: 'RED'
                        }
                      },
                      {
                        type: 'ITEM_OPTION_VAL',
                        id: '#item_option_value_color_blue',
                        itemOptionValueData: {
                          name: 'Blue'
                        }
                      }
                    ]
                  }
                },
                {
                  type: 'ITEM_OPTION',
                  id: '#item_option_size',
                  itemOptionData: {
                    name: 'SIZE_OPTIONS',
                    values: [
                      {
                        type: 'ITEM_OPTION_VAL',
                        id: '#item_option_value_size_small',
                        itemOptionValueData: {
                          name: 'Small'
                        }
                      },
                      {
                        type: 'ITEM_OPTION_VAL',
                        id: '#item_option_value_size_medium',
                        itemOptionValueData: {
                          name: 'Medium'
                        }
                      },
                      {
                        type: 'ITEM_OPTION_VAL',
                        id: '#item_option_value_size_large',
                        itemOptionValueData: {
                          name: 'Large'
                        }
                      }
                    ]
                  }
                },
                {
                  type: 'ITEM',
                  id: '#item',
                  itemData: {
                    name: 'Shirt',
                    variations: [
                      {
                        type: 'ITEM_VARIATION',
                        id: '#item_variation_small_red',
                        itemVariationData: {
                          pricingType: 'FIXED_PRICING',
                          priceMoney: {
                            amount: 2500,
                            currency: 'USD'
                          },
                          itemOptionValues: [
                            {
                              itemOptionId: '#item_option_size',
                              itemOptionValueId: '#item_option_value_size_small'
                            },
                            {
                              itemOptionId: '#item_option_color',
                              itemOptionValueId: '#item_option_value_color_red'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ITEM_VARIATION',
                        id: '#item_variation_medium_red',
                        itemVariationData: {
                          pricingType: 'FIXED_PRICING',
                          priceMoney: {
                            amount: 3000,
                            currency: 'USD'
                          },
                          itemOptionValues: [
                            {
                              itemOptionId: '#item_option_size',
                              itemOptionValueId: '#item_option_value_size_medium'
                            },
                            {
                              itemOptionId: '#item_option_color',
                              itemOptionValueId: '#item_option_value_color_red'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ITEM_VARIATION',
                        id: '#item_variation_large_red',
                        itemVariationData: {
                          pricingType: 'FIXED_PRICING',
                          priceMoney: {
                            amount: 3500,
                            currency: 'USD'
                          },
                          itemOptionValues: [
                            {
                              itemOptionId: '#item_option_size',
                              itemOptionValueId: '#item_option_value_size_large'
                            },
                            {
                              itemOptionId: '#item_option_color',
                              itemOptionValueId: '#item_option_value_color_red'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ITEM_VARIATION',
                        id: '#item_variation_small_blue',
                        itemVariationData: {
                          pricingType: 'FIXED_PRICING',
                          priceMoney: {
                            amount: 2500,
                            currency: 'USD'
                          },
                          itemOptionValues: [
                            {
                              itemOptionId: '#item_option_size',
                              itemOptionValueId: '#item_option_value_size_small'
                            },
                            {
                              itemOptionId: '#item_option_color',
                              itemOptionValueId: '#item_option_value_color_blue'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ITEM_VARIATION',
                        id: '#item_variation_medium_blue',
                        itemVariationData: {
                          pricingType: 'FIXED_PRICING',
                          priceMoney: {
                            amount: 3000,
                            currency: 'USD'
                          },
                          itemOptionValues: [
                            {
                              itemOptionId: '#item_option_size',
                              itemOptionValueId: '#item_option_value_size_medium'
                            },
                            {
                              itemOptionId: '#item_option_color',
                              itemOptionValueId: '#item_option_value_color_blue'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ITEM_VARIATION',
                        id: '#item_variation_large_blue',
                        itemVariationData: {
                          pricingType: 'FIXED_PRICING',
                          priceMoney: {
                            amount: 3500,
                            currency: 'USD'
                          },
                          itemOptionValues: [
                            {
                              itemOptionId: '#item_option_size',
                              itemOptionValueId: '#item_option_value_size_large'
                            },
                            {
                              itemOptionId: '#item_option_color',
                              itemOptionValueId: '#item_option_value_color_blue'
                            }
                          ]
                        }
                      }
                    ],
                    productType: 'REGULAR',
                    itemOptions: [
                      {
                        itemOptionId: '#item_option_size'
                      },
                      {
                        itemOptionId: '#item_option_color'
                      }
                    ]
                  }
                }
              ]
            }
          ]
        });
      
        console.log(response.result);
        res.json(response.result)
      } catch(error) {
        console.log(error);
      }
  } else {
    res.status(500).send();
  }
}
