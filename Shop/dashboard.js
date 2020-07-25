(function() {
    const OFFSET = 220;
    const openClass = 'message--open';
    const wrapper = document.getElementById('wrapper');
    const messages = Array.from(document.querySelectorAll('.message'));
    
    // Small helper for listening for an animation/transition end event.
    function listenForEndEvent(el, endEventType, cb) {
        const onEnd = () => {
            cb();
            el.removeEventListener(endEventType, onEnd);
        };
        el.addEventListener(endEventType, onEnd);
    }
    
    function transitionToClosed(message, index) {
        const grower = message.querySelector('.grower');
        const pusher = message.querySelector('.pusher');
        
        
        // Remove any open class and add the closing animation class
        message.classList.add('message--closing');
        message.classList.remove('message--open');
        // pusher.style.height = '300px';
        pusher.classList.add('closing');
        
        // We're animating the grower out now, so we listen to the `animationend`
        // event.  After that, remove any style artifacts from other animations
        listenForEndEvent(grower, 'animationend', () => {
            message.classList.remove('message--closing');
            message.classList.remove('message--open');
            pusher.classList.remove('closing');
            
            // After all animations are done, we need to adjust
            // the scroll top amount back the amount that was 
            // offset
            // The page doesn't just because it's an exact
            // calculation
            document.body.scrollTop -= OFFSET;
        });

    }
 
    function transitionToOpen(message) {
        const details = message.querySelector('.message__details');
        const grower = message.querySelector('.grower');
        const pusher = message.querySelector('.pusher');
        
        if (message.classList.contains(openClass)) {
            message.classList.remove(openClass);
            
            return;
        }
        
        // Start the opening transition by adding this class here
        message.classList.add('message--opening');
        pusher.classList.add('opening');
        pusher.style.height = '300px';

        listenForEndEvent(grower, 'animationend', () => {
            pusher.style.height = '0';
            message.classList.remove('message--opening');
            message.classList.add(openClass);
            pusher.classList.remove('opening');
        });

    }
    
    function handleMessageOpen(messageToOpen) {
        const messageToClose = wrapper.querySelector(`.${openClass}`);
        
        if (messageToClose) {
            transitionToClosed(messageToClose);
        }
        
        if (messageToOpen === messageToClose) {
            return;
        }
        
        transitionToOpen(messageToOpen)
    }
    
    messages.forEach(m => {
        m.addEventListener('click', handleMessageOpen.bind(null, m));
    });
})();