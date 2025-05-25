document.addEventListener('DOMContentLoaded', function() {
    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Google Maps interaction
    const map = document.querySelector('.location-map iframe');
    if(map) {
        map.addEventListener('mouseover', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        map.addEventListener('mouseout', function() {
            this.style.filter = 'brightness(1)';
        });
    }
});