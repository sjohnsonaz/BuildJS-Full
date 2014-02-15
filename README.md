BuildJS
=======

BuildJS is a simple utility for Class definition, inheritance, and dynamic loading.  It also includes a complete MVC framework, and UI Widget framework.

##Class Definitions
JavaScript itself has a very flexible, yet somewhat underpowered class system.  We've created a simple and just as flexible system to improve this class system, giving you:
* Prototypal Inheritance chaining
* Super Constructors
* Lazy Loading

In classical JavaScript, we only have access to **Protoypal Inheritanc**.  Basically, every object has access to some prototype which contains its members.  Thus all instances of that class have the same members, and they are shared.  Furthermore, these prototypes can be chained together, so that a child class can see its parent's prototype.  We've handled that for you automatically.

However, in other languages, we have access to the parent's constructor, methods, and static methods.  In classical JavaScript, that simply isn't possible.  But, we've made it simple!  **Super Constructor Inheritance** is included!  Not only that, but you can create a child class of any classical JavaScript class definition.  The parent does not have to be created with BuildJS.

Also, we've included **Lazy Loading** for modules.  Say you've made a HUGE library, and only want to load the code being used.  That's easy!  Every class declares its requirements, and if the files aren't loaded beforehand, it'll fetch them!  It'll even grab them cross domain!

##MVC Framework

With the creation of Node.js, JavaScript works on both the front end and back end of web applications.  However, these are often coded in vastly different ways.  Now you can use a single coherent definition system, that spans all layers of you application!

##UI Widget Framework

We've developed a simple Widget Framework which not only includes prebuild tools, but lets you easily extend them with your own!