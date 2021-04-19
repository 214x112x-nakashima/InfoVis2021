class Vec3
{
  constructor(x,y,z)
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  //Add method
  add(v)
  {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  //Sum method
  sum()
  {
    return this.x + this.y + this.z;
  }

  min()
  {
    var min = this.x;
    if(this.y < min)
    {
      min = this.y;
    }
    if(this.z < min)
    {
      min = this.z;
    }

    return min;
  }

  max()
  {
    var max = this.x;
    if(this.y > max)
    {
      max = this.y;
    }
    if(this.z > max)
    {
      max = this.z;
    }

    return max;
  }

  mid()
  {
    if(this.y <= this.x)
    {
      if(this.x <= this.z){return this.x;}
      else
      {
        if(this.z <= this.y){return this.y;}
        return this.z;
      }
    }
    else
    {
      if(this.z <= this.x){return this.x;}
      else
      {
          if(this.z<=this.y){return this.z;}
          return this.y;
      }
    }
  }

}

function AreaOfTriangle(v0,v1,v2)
{
  var a = Math.sqrt((v0.x-v1.x)**2 + (v0.y-v1.y)**2 + (v0.z-v1.z)**2);
  var b = Math.sqrt((v1.x-v2.x)**2 + (v1.y-v2.y)**2 + (v1.z-v2.z)**2);
  var c = Math.sqrt((v2.x-v0.x)**2 + (v2.y-v0.y)**2 + (v2.z-v0.z)**2);
  var s = (a+b+c)/2;
  return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}
