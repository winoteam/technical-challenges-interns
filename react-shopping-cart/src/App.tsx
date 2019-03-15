import React, { Component } from 'react'
import {
  Page,
  Layout,
  Card,
  ResourceList,
  List,
  Avatar,
  TextStyle,
} from '@shopify/polaris'

type Props = {}

type Product = {
  id: number,
  name: string,
  description: string,
  price: number,
  tax: number,
}

type CartProduct = {
  productId: number,
  quantity: number,
}

type State = {
  data: {
    products: Product[],
  },
  cart: {
    products: CartProduct[],
    taxes: Array<{
      name: number,
      value: number,
    }>,
    totalAmountIncludingTaxes: number,
  },
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: {
        products: [
          {
            id: 0,
            name: 'Product A',
            description: 'Lorem ipsum dolor sit, amet consectetur',
            price: 12,
            tax: 20,
          },
          {
            id: 1,
            name: 'Product B',
            description: 'Lorem ipsum dolor sit, amet consectetur',
            price: 13,
            tax: 5.5,
          },
        ],
      },
      cart: {
        products: [
          {
            productId: 0,
            quantity: 2,
          },
        ],
        taxes: [
          {
            name: 20,
            value: 4,
          },
        ],
        totalAmountIncludingTaxes: 24,
      },
    }
  }

  render() {
    const { data, cart } = this.state
    return (
      <Page title="React Shopping Cart">
        <Layout>
          <Layout.Section>
            <Card>
              <ResourceList
                resourceName={{ singular: 'customer', plural: 'customers' }}
                items={data.products}
                renderItem={item => {
                  const { id, name, description } = item
                  const media = (
                    <Avatar customer={true} size="medium" name={name} />
                  )
                  const shortcutActions = [
                    {
                      content: 'Add to basket (+1)',
                      onAction: () => alert('Add to basket'),
                    },
                  ]
                  return (
                    // @ts-ignore
                    <ResourceList.Item
                      id={id}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                      shortcutActions={shortcutActions}
                      persistActions={true}
                      onClick={console.log}
                    >
                      <h3>
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div>{description}</div>
                    </ResourceList.Item>
                  )
                }}
              />
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card
              title="Basket"
              secondaryFooterAction={{ content: 'Cancel cart' }}
              primaryFooterAction={{ content: 'Pay' }}
            >
              <Card.Section title="Items">
                <List>
                  {cart.products.map(product => (
                    <List.Item>{product.quantity} × xxx</List.Item>
                  ))}
                </List>
              </Card.Section>
              <Card.Section title="Totals">
                <List>
                  {cart.taxes.map(tax => (
                    <List.Item>
                      TVA {tax.name}% : {tax.value.toFixed(2)}€
                    </List.Item>
                  ))}
                  <List.Item>
                    {cart.totalAmountIncludingTaxes.toFixed(2)}€ TTC
                  </List.Item>
                </List>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}
