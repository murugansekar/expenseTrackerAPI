class Node
  {
    constructor(value)
    {
      this.value = value;
      this.left = null;
      this.right = null;        
    }      
  }


class MinAndMaxBST 
{
  constructor()
  {
    this.root = null;
  }
  
    
  insert(i)
  {
    this.root = this.inserti(this.root, i);
  }
    
  inserti(node, value)
  {
    if(node == null)
    {
      return new Node(value);
    }
    if(value < node.value)
    {
      node.left = this.inserti(node.left, value);
    }
    else if(value > node.value)
    {
      node.right = this.inserti(node.right, value);
    }
    return node;
  }

  inOrder(node)
  {
    if(node !== null)
    {
      this.inOrder(node.left);
      this.inOrder(node.right);
    }
  }
  findMinimum(node)
  {
    if(node.left !== null)
    {
      return this.findMinimum(node.left);
    }
    return node;
  }
  findMaximum(node)
  {
    if(node.right !== null)
    {
      return this.findMaximum(node.right);
    }
    return node;
  }
}   

let bst = new MinAndMaxBST();
bst.insert(50);
bst.insert(70);        
bst.insert(30);
bst.insert(15);
bst.insert(35);
bst.insert(7);
bst.insert(22);
bst.inOrder(bst.root);
minNode = bst.findMinimum(bst.root);
maxNode = bst.findMaximum(bst.root);
console.log("Minimum : "+minNode.value);
console.log("Maximum : "+maxNode.value);
  