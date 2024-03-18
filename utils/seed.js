db.once('open', async () => {
    try {
      await Thought.deleteMany();
  
      // Create thoughts
      await Thought.create([
        { thoughtText: 'Do you think Kate Middleton is really missing?', username: 'the_first_user' },
        { thoughtText: 'How much wood would a woodchuck chuck if a wouldchuck could chuck wood', username: 'the_second_user' },
        
      ]);
  
      console.log('Database seeded successfully');
      process.exit(0); 
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  });